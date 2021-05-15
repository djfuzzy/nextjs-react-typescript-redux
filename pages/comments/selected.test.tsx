import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import SelectedCommentPage from './selected';
import { CoreState } from '../../store';
import { ActionState } from '../../types/ActionState';
import { Comment } from '../../types/Comment';

describe('Selected page', () => {
  const mockStore = configureStore<CoreState>();
  // TODO: Move this elsewhere and add test data
  const comments = {
    '1': {
      id: '1',
      name: 'Homer Simpson',
      content: 'Purple is a fruit.',
      createdAt: new Date('2021-03-22T14:52:10Z'),
    } as Comment,
  };

  const store = mockStore({
    comments: {
      entities: comments,
      ids: Object.keys(comments),
      loadState: ActionState.Completed,
      saveState: ActionState.Initial,
      selectedCommentId: '1',
    },
  });

  it('should match the snapshot', () => {
    const page = (
      <Provider store={store}>
        <SelectedCommentPage />
      </Provider>
    );
    const tree = renderer.create(page).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
