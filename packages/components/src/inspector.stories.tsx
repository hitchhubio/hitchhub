import { createHitch, createInstrumentationRegistry } from '@hitchhub/core';
import {
  createInspector,
  createTokenOverlay,
  type InspectionResult,
} from '@hitchhub/inspector';
import { tailwind } from '@hitchhub/tailwind';
import { manifest } from '@hitchhub/theme-default';
import type { Meta } from '@storybook/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createComponents } from './components.js';

function InspectorDemo() {
  const host = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<InspectionResult>();
  const setup = useMemo(() => {
    const registry = createInstrumentationRegistry();
    const hitch = createHitch({
      adapter: tailwind({ prefix: 'hitch' }),
      manifest,
      instrumentation: { registry },
    });
    return {
      components: createComponents(hitch),
      inspector: createInspector({ manifest, registry }),
    };
  }, []);
  const overlay = useMemo(() => createTokenOverlay(document), []);

  useEffect(() => () => overlay.clear(), [overlay]);
  const inspect = (target: Element) => {
    const inspected = setup.inspector.inspect(target);
    if (inspected) {
      setResult(inspected);
    }
  };
  const { Button, Avatar, Select } = setup.components;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1fr)',
        alignItems: 'start',
        gap: 32,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        ref={host}
        onClick={(event) => inspect(event.target as Element)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          minHeight: 220,
          padding: 24,
          border: '1px dashed #94a3b8',
        }}
      >
        <Button>Save changes</Button>
        <Avatar name="Ada Lovelace" />
        <Select
          label="Journey"
          options={[
            { value: 'one', label: 'London to Bristol' },
            { value: 'two', label: 'York to Leeds' },
          ]}
        />
      </div>
      <aside>
        <h2>Token inspector</h2>
        <p>Click an instrumented component part, then hover a token.</p>
        {result ? (
          <>
            <h3>
              {result.component} · {result.part}
            </h3>
            <ul>
              {result.tokens.map((token) => (
                <li
                  key={`${token.property}-${token.token}`}
                  onMouseEnter={() => overlay.show(result, token.property)}
                  onMouseLeave={overlay.clear}
                  style={{ marginBlock: 8, cursor: 'crosshair' }}
                >
                  <code>{token.property}</code> → <strong>{token.token}</strong>{' '}
                  <small>
                    ({token.type}, {String(token.resolvedValue)})
                  </small>
                </li>
              ))}
            </ul>
            <p>
              {Math.round(result.geometry.width)} ×{' '}
              {Math.round(result.geometry.height)}px
            </p>
          </>
        ) : (
          <p>No part selected.</p>
        )}
      </aside>
    </div>
  );
}

const meta = {
  title: 'Inspector/Token overlay',
  component: InspectorDemo,
} satisfies Meta<typeof InspectorDemo>;
export default meta;
export const ProofOfConcept = {};
