import { expect, test, describe } from 'vitest';
import { render } from '@testing-library/react';
import Modal from '../components/Modal.tsx';

describe('Modal', () => {
  test('renders correctly', () => {
    const { asFragment } = render(
      <Modal>
        <h1>Hello World</h1>
      </Modal>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
