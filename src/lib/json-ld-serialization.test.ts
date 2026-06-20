import { test } from 'node:test';
import assert from 'node:assert';

test('JSON-LD serialization escapes < character', () => {
  const jsonLd = {
    name: 'Test <script>alert(1)</script>',
    url: 'https://example.com?a=<b>',
  };

  const serialized = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  // Assert that < is replaced with \u003c
  assert.strictEqual(serialized.includes('<'), false);
  assert.strictEqual(serialized.includes('\\u003c'), true);

  // Parse it back to ensure it is still valid JSON (JSON.parse handles \uXXXX)
  const parsed = JSON.parse(serialized);
  assert.strictEqual(parsed.name, jsonLd.name);
  assert.strictEqual(parsed.url, jsonLd.url);

  console.log('Serialized:', serialized);
});
