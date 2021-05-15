import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import SsrCommentPage from './[id]';
import { CoreState } from '../../store';
import { ActionState } from '../../types/ActionState';
import { Comment } from '../../types/Comment';

describe('Selected page', () => {
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
        <SsrCommentPage comment={mockComments[0]} />
      </Provider>
    );
    const tree = renderer.create(index).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
