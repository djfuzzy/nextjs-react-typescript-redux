import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import IndexPage from '.';
import { CoreState } from '../store';
import { ActionState } from '../types/ActionState';
import { Comment } from '../types/Comment';

describe('Index page', () => {
  const mockStore = configureStore<CoreState>();

  // TODO: Move this elsewhere
  const mockComments = [
    {
      id: '1',
      name: 'Homer Simpson',
      content: 'Purple is a fruit.',
      createdAt: new Date('2021-03-22T14:52:10Z'),
    },
  ] as Comment[];

  const entities = mockComments.reduce(
    (entities, entity) => ({ ...entities, [entity.id]: entity }),
    {}
  );

  const store = mockStore({
    comments: {
      entities,
      ids: Object.keys(entities),
      loadState: ActionState.Completed,
      saveState: ActionState.Initial,
      selectedCommentId: undefined,
    },
  });

  it('should match the snapshot', () => {
    const index = (
      <Provider store={store}>
        <IndexPage />
      </Provider>
    );
    const tree = renderer.create(index).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
