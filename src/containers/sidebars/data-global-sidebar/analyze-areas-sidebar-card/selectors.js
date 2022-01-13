import { createStructuredSelector } from 'reselect';

// selectors
import { selectSubnationalSelected } from 'selectors/aoi-selectors';

export default createStructuredSelector({
  subnationalSelcted: selectSubnationalSelected
});
