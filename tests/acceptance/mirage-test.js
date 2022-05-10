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

  test('a basic trait', async function (assert) {
    let document = this.server.create('document', 'rfc');

    let response = await fetch(`https://api.test/documents/${document.id}`);
    let actual = await response.json();
    let expected = {
      data: {
        id: String(document.id),
        type: 'documents',
        attributes: {
          title: 'RFC-001: Example RFC',
        },
      },
    };

    assert.propContains(actual, expected);
  });

  test('a POST handler with JSON:API', async function (assert) {
    let postResponse = await fetch('https://api.test/pizzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/vnd.api+json' },
      body: JSON.stringify({
        data: {
          type: 'pizzas',
          attributes: {
            kind: 'quattro stagioni',
          },
        },
      }),
    });

    assert.strictEqual(postResponse.status, 201);

    let getResponse = await fetch('https://api.test/pizzas');
    let actual = await getResponse.json();
    let expected = {
      data: [
        {
          type: 'pizzas',
          id: '1',
          attributes: {
            kind: 'quattro stagioni',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });

  test('a POST handler with generic JSON', async function (assert) {
    let postResponse = await fetch('https://api.test/pizzas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'quattro stagioni',
      }),
    });

    assert.strictEqual(postResponse.status, 201);

    let getResponse = await fetch('https://api.test/pizzas');
    let actual = await getResponse.json();
    let expected = {
      data: [
        {
          type: 'pizzas',
          id: '1',
          attributes: {
            kind: 'quattro stagioni',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });

  test('using a serializer to auto-include related records', async function (assert) {
    this.server.create('album', {
      title: 'Zoning',
      artists: [
        this.server.create('artist', {
          name: 'Mary Lou Williams',
        }),
      ],
    });

    let response = await fetch('https://api.test/albums/1');
    let actual = await response.json();
    let expected = {
      data: {
        id: '1',
        type: 'albums',
        attributes: {
          title: 'Zoning',
        },
        relationships: {
          artists: {
            data: [
              {
                id: '1',
                type: 'artists',
              },
            ],
          },
        },
      },
      included: [
        {
          id: '1',
          type: 'artists',
          attributes: {
            name: 'Mary Lou Williams',
          },
        },
      ],
    };

    assert.propContains(actual, expected);
  });
});
