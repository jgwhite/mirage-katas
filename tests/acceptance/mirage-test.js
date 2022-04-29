import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | mirage', function (hooks) {
  setupApplicationTest(hooks);

  test('a basic text endpoint', async function (assert) {
    let response = await fetch('https://api.test/ping');
    let actual = await response.text();
    let expected = 'pong';

    assert.strictEqual(actual, expected);
  });

  test('a basic json endpoint', async function (assert) {
    let response = await fetch('https://api.test/ping.json');
    let actual = await response.json();
    let expected = { result: 'pong' };

    assert.propContains(actual, expected);
  });

  test('a basic model', async function (assert) {
    this.server.create('document', { title: 'First document' });

    let response = await fetch('https://api.test/documents');
    let actual = await response.json();
    let expected = {
      data: [
        {
          id: '1',
          type: 'documents',
          attributes: {
            title: 'First document',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });

  test('a basic relationship', async function (assert) {
    let folder = this.server.create('folder', { name: 'Notes' });

    folder.createDocument({ title: 'Hello World' });

    let response = await fetch('https://api.test/folders?include=documents');
    let actual = await response.json();
    let expected = {
      data: [
        {
          id: '1',
          type: 'folders',
          attributes: {
            name: 'Notes',
          },
          relationships: {
            documents: {
              data: [
                {
                  type: 'documents',
                  id: '1',
                },
              ],
            },
          },
        },
      ],
      included: [
        {
          id: '1',
          type: 'documents',
          attributes: {
            title: 'Hello World',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });

  test('a basic factory', async function (assert) {
    this.server.create('pizza');

    let response = await fetch('https://api.test/pizzas');
    let actual = await response.json();
    let expected = {
      data: [
        {
          id: '1',
          type: 'pizzas',
          attributes: {
            kind: 'margherita',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });

  test('a dynamic factory attribute', async function (assert) {
    this.server.createList('rocky', 6);

    let response = await fetch('https://api.test/rockies');
    let actual = await response.json();
    let expected = {
      data: [
        {
          id: '1',
          type: 'rockies',
          attributes: {
            title: 'Rocky',
          },
        },
        {
          id: '2',
          type: 'rockies',
          attributes: {
            title: 'Rocky II',
          },
        },
        {
          id: '3',
          type: 'rockies',
          attributes: {
            title: 'Rocky III',
          },
        },
        {
          id: '4',
          type: 'rockies',
          attributes: {
            title: 'Rocky IV',
          },
        },
        {
          id: '5',
          type: 'rockies',
          attributes: {
            title: 'Rocky V',
          },
        },
        {
          id: '6',
          type: 'rockies',
          attributes: {
            title: 'Rocky Balboa',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });
});
