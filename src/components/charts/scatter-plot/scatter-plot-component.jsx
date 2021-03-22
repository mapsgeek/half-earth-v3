import React, { useState, useEffect, useRef } from 'react';
import * as PIXI from 'pixi.js';
import { ease } from 'pixi-ease';
import { difference } from 'lodash';
import circleImg from 'images/country-bubble.png'
import * as d3 from 'd3';
import cx from 'classnames';

import styles from './scatter-plot-styles.module.scss';

const ScatterPlot = ({
  data,
  xAxisTicks,
  yAxisTicks,
  countryISO,
  xAxisLabels,
  onBubbleClick,
  handleContainerClick,
  tooltipValuesFormats,
  countryChallengesSelectedKey,
}) => {
  const chartSurfaceRef = useRef(null);
  const [bubblesArray, setBubblesArray] = useState([]);
  const [activeBubblesArray, setActiveBubblesArray] = useState([]);
  const [chartScale, setChartScale] = useState(null);
  const [tooltipState, setTooltipState] = useState(null);
  const padding = 50; // for chart edges
  const tooltipOffset = 50;
  const bigBubble = 90;
  const smallBubble = 45;
  const [appConfig, setAppConfig ] = useState({
    ready: false,
    App: null,
    DomContainer: null,
    AppContainer: null,
    CircleTexture: null
  })

  const minXValue = (data, selectedKey) => d3.min(data, (d) => d.xAxisValues[selectedKey])
  const maxXValue = (data, selectedKey) => d3.max(data, (d) => d.xAxisValues[selectedKey])
  const addBubblesToChart = (data, texture, appContainer) => data.map(d => {
    //const bubble = new Bubble(data);
    //appContainer.addChild(bubble);
    //return bubble;
    const bubbleWrapper = new PIXI.Container();
    bubbleWrapper.y = chartScale.yScale(d.yAxisValue);
    bubbleWrapper.x = chartScale.xScale(d.xAxisValues[countryChallengesSelectedKey]);
    bubbleWrapper.slug = d.iso;
    bubbleWrapper.attributes = d;
    const country = new PIXI.Sprite(texture);
    const aura = new PIXI.Sprite(texture);
    country.attributes = d;
    country.anchor.set(0.5);
    country.tint = PIXI.utils.string2hex(d.theme.color);
    country.interactive = true;
    country.buttonMode = true;
    // country.blendMode = PIXI.BLEND_MODES.ADD;
    console.log(d)
    country.width = d.theme.size;
    country.height = d.theme.size;
    aura.width = d.theme.size + 4;
    aura.height = d.theme.size + 4;
    aura.tint = PIXI.utils.string2hex("#040E14");
    aura.anchor.set(0.5);
    bubbleWrapper.addChild(aura);
    bubbleWrapper.addChild(country);
    if (d.theme.label) {
      const textStyle = new PIXI.TextStyle({fontFamily: 'Arial, sans', fontSize: 14, fill: '#000000'})
      const countryIsoText = new PIXI.Text(d.theme.label, textStyle);
      countryIsoText.anchor.set(0.5);
      bubbleWrapper.addChild(countryIsoText);
    }
    appContainer.addChild(bubbleWrapper);
    return bubbleWrapper;
  })

  useEffect(() => {
    if (chartSurfaceRef.current) {
      const App = new PIXI.Application({
        width: chartSurfaceRef.current.offsetWidth,
        height: chartSurfaceRef.current.offsetHeight,
        transparent: true,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true,
        resizeTo: chartSurfaceRef.current,
        resizeThrottle: 250,
      })

      setAppConfig({
        ...appConfig,
        App,
        DomContainer: chartSurfaceRef.current,
        AppContainer: new PIXI.Container(),
        CircleTexture: PIXI.Texture.from(circleImg),
        ready: true
      })
    }
  }, [chartSurfaceRef.current])

  // init PIXI app and pixi viewport
  useEffect(() => {
    if (appConfig.ready && data) {
      const xScale = d3.scaleLinear()
      .domain([minXValue(data, countryChallengesSelectedKey), maxXValue(data, countryChallengesSelectedKey)])
      .range([padding, chartSurfaceRef.current.offsetWidth - padding]);
      const yScale = d3.scaleLinear()
      .domain([0, 100])
      .range([chartSurfaceRef.current.offsetHeight - padding, padding]);

      setChartScale({ xScale, yScale })
    }
    }, [appConfig.ready, data, countryChallengesSelectedKey]);

    useEffect(() => {
      if (chartScale) {
        const { App, AppContainer, DomContainer, CircleTexture } = appConfig
        AppContainer.sortableChildren = true;
        DomContainer.appendChild(App.view);
        App.stage.addChild(AppContainer);
        const currentData = data.map(bubble => bubble.iso);
        const oldBubbles = AppContainer.children;
        const bubblesToRemove = difference(activeBubblesArray, currentData);
        const persistentBubbles = activeBubblesArray.filter(bubble => currentData.indexOf(bubble) !== -1);
        const newBubbles = difference(currentData, persistentBubbles);

        oldBubbles
          .filter(bubble => bubblesToRemove.includes(bubble.slug))
          .forEach(bubble => {
            const animation = ease.add(bubble, {alpha: 0}, {duration: 300, ease: 'easeInOutExpo'});
            animation.once('complete', () => AppContainer.removeChild(bubble))
          })

        const persistent = oldBubbles
          .filter(bubble => persistentBubbles.includes(bubble.slug))
          .map((bubble, index) => {
            ease.add(bubble,
              {x: chartScale.xScale(bubble.attributes.xAxisValues[countryChallengesSelectedKey])},
              {duration: 700, ease: 'easeInOutExpo', wait: index * 8}
            )
            return bubble
          })

        if (activeBubblesArray.length) {
          const newData = data.filter(d => newBubbles.includes(d.iso));
          const newbubbles = addBubblesToChart(newData, CircleTexture, AppContainer);
          setBubblesArray([...persistent, ...newbubbles]);
        } else {
          const bubbles = addBubblesToChart(data, CircleTexture, AppContainer);
          setBubblesArray(bubbles);
        }
        setActiveBubblesArray(currentData);
      }
    }, [chartScale])

    useEffect(() => {
      if (bubblesArray.length && countryISO && chartScale) {
        bubblesArray.forEach((bubble) => {
          const { children } = bubble;
          const country = children[0];
          bubble.removeAllListeners()
          const isSelectedCountry = countryISO === bubble.slug;
          //if (isSelectedCountry) { bubble.zIndex = 1}
          //country.width = isSelectedCountry ? bigBubble : smallBubble;
          //country.height = isSelectedCountry ? bigBubble : smallBubble;
          //country.alpha = isSelectedCountry ? 1 : 0.6;

          bubble.on('pointerover', e => {
            setTooltipState({
              x: e.data.global.x,
              y: e.data.global.y,
              name: bubble.attributes.name,
              continent: bubble.attributes.continent,
              color: bubble.attributes.color,
              yValue: Number.parseFloat(bubble.attributes.yAxisValue).toFixed(2),
              yLabel: 'Species Protection Index',
              xValue: filter => tooltipValuesFormats[filter](bubble.attributes.xAxisValues[filter]),
              xLabel: filter => xAxisLabels[filter]
            })
            // if (!isSelectedbubble) {
            //   ease.add(bubble, {
            //     width: bigBubble,
            //     height: bigBubble,
            //   }, {duration: 150, ease: 'easeInOutExpo' });
            // }
          });

          // mouse leave
          bubble.on('pointerout', e => {
            setTooltipState(null)
            // if (!isSelectedbubble) {
            //   ease.add(bubble, {
            //     width: smallBubble,
            //     height: smallBubble,
            //   }, {duration: 150, ease: 'easeInOutExpo' });
            // }
          });

          bubble.on('click', e => {
            if (!isSelectedCountry) {
              onBubbleClick({ countryISO: bubble.attributes.iso, countryName: bubble.attributes.name })
            }
          })
        })
      }
    },[countryISO, bubblesArray, chartScale])


  return (
    <>
      <div className={cx(styles.chartContainer)} onClick={handleContainerClick}>
        <div className={styles.scatterPlotContainer} ref={chartSurfaceRef}>
          <div className={styles.yAxisTicksContainer}>
            {yAxisTicks &&
              yAxisTicks.map((tick) => (
                <span className={styles.tick} key={`y-${tick}`}>
                  {tick}
                </span>
              ))}
          </div>
          <div className={styles.xAxisTicksContainer}>
            {xAxisTicks &&
              xAxisTicks.map((tick, index) => (
                <span className={styles.tick} key={`x-${tick}-${index}`}>
                  {tick}
                </span>
              ))}
          </div>
        </div>
        {tooltipState && (
          <div
            className={styles.tooltip}
            style={{
              position: 'absolute',
              left: `${tooltipState.x + tooltipOffset}px`,
              top: `${tooltipState.y + tooltipOffset}px`
            }}
          >
            <section
              className={styles.countryLabel}
              style={{ backgroundColor: tooltipState.color }}
            >
              <span className={styles.name}>{tooltipState.name} </span>
              <span className={styles.continent}>
                ({tooltipState.continent})
              </span>
            </section>
            <section className={styles.countryData}>
              <p className={styles.data}>
                {tooltipState.xLabel(countryChallengesSelectedKey)}:{' '}
                {tooltipState.xValue(countryChallengesSelectedKey)}
              </p>
              <p className={styles.data}>
                {tooltipState.yLabel}: {tooltipState.yValue}
              </p>
            </section>
          </div>
        )}
      </div>
    </>
  );
}

export default ScatterPlot;