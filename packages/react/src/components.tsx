import type { Hitch } from '@hitchhub/core';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { defineComponents, definitions } from './definitions.js';

function classes(...values: Array<string | undefined>): string {
  return values.filter(Boolean).join(' ');
}

export function createComponents(hitch: Hitch) {
  const styles = defineComponents(hitch);

  function Button({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
    return (
      <button
        {...styles.button.root.attributes}
        {...props}
        className={classes(styles.button.root.className, className)}
      />
    );
  }

  type AvatarProps = ComponentPropsWithoutRef<'span'> & {
    name: string;
    src?: string;
  };
  function Avatar({ name, src, className, ...props }: AvatarProps) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
    return (
      <span
        {...styles.avatar.root.attributes}
        {...props}
        className={classes(
          styles.avatar.root.className,
          'hitch:inline-flex hitch:items-center hitch:justify-center hitch:overflow-hidden',
          className,
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="hitch:size-full hitch:object-cover"
          />
        ) : (
          <span
            {...styles.avatar.initials.attributes}
            className={styles.avatar.initials.className}
          >
            {initials}
          </span>
        )}
      </span>
    );
  }

  type SelectOption = { value: string; label: ReactNode };
  type SelectProps = Omit<ComponentPropsWithoutRef<'select'>, 'children'> & {
    label?: ReactNode;
    options: readonly SelectOption[];
  };
  function Select({ label, options, className, id, ...props }: SelectProps) {
    const selectId = id ?? `hh-select-${String(props.name ?? 'field')}`;
    return (
      <label
        {...styles.select.root.attributes}
        className={classes(
          styles.select.root.className,
          'hitch:inline-flex hitch:flex-col',
        )}
        htmlFor={selectId}
      >
        {label}
        <span className="hitch:relative hitch:inline-flex">
          <select
            {...styles.select.trigger.attributes}
            {...props}
            id={selectId}
            className={classes(
              styles.select.trigger.className,
              'hitch:appearance-none hitch:pr-8',
              className,
            )}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span
            {...styles.select.icon.attributes}
            aria-hidden="true"
            className={classes(
              styles.select.icon.className,
              'hitch:pointer-events-none hitch:absolute hitch:right-2 hitch:self-center',
            )}
          >
            ▾
          </span>
        </span>
      </label>
    );
  }

  return { Button, Avatar, Select, definitions: styles };
}

const defaults = (() => {
  const styles = definitions;
  function Button({ className, ...props }: ComponentPropsWithoutRef<'button'>) {
    return (
      <button
        {...props}
        className={classes(styles.button.root.className, className)}
      />
    );
  }
  function Avatar({
    name,
    src,
    className,
    ...props
  }: ComponentPropsWithoutRef<'span'> & { name: string; src?: string }) {
    const initials = name
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase();
    return (
      <span
        {...props}
        className={classes(
          styles.avatar.root.className,
          'hitch:inline-flex hitch:items-center hitch:justify-center hitch:overflow-hidden',
          className,
        )}
      >
        {src ? (
          <img
            src={src}
            alt={name}
            className="hitch:size-full hitch:object-cover"
          />
        ) : (
          <span className={styles.avatar.initials.className}>{initials}</span>
        )}
      </span>
    );
  }
  function Select({
    label,
    options,
    className,
    id,
    ...props
  }: Omit<ComponentPropsWithoutRef<'select'>, 'children'> & {
    label?: ReactNode;
    options: readonly { value: string; label: ReactNode }[];
  }) {
    const selectId = id ?? `hh-select-${String(props.name ?? 'field')}`;
    return (
      <label
        className={classes(
          styles.select.root.className,
          'hitch:inline-flex hitch:flex-col',
        )}
        htmlFor={selectId}
      >
        {label}
        <span className="hitch:relative hitch:inline-flex">
          <select
            {...props}
            id={selectId}
            className={classes(
              styles.select.trigger.className,
              'hitch:appearance-none hitch:pr-8',
              className,
            )}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span
            aria-hidden="true"
            className={classes(
              styles.select.icon.className,
              'hitch:pointer-events-none hitch:absolute hitch:right-2 hitch:self-center',
            )}
          >
            ▾
          </span>
        </span>
      </label>
    );
  }
  return { Button, Avatar, Select };
})();

export const { Button, Avatar, Select } = defaults;
