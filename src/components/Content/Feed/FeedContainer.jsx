import { withAuthRedirect } from '../../withAuthRedirect';
import Feed from './Feed';

const FeedApi = (props) => {
  return (<Feed />);
};

const FeedContainer = withAuthRedirect(FeedApi);

export default FeedContainer;