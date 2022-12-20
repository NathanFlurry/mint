import clsx from 'clsx';
import Link from 'next/link';
import { forwardRef, useState } from 'react';

import Icon from './Icon';

type TopLevelProps = {
  href: string;
  isActive: boolean;
  children?: any;
  className?: string;
  color?: string;
  onClick?: (el: any) => void;
  icon?: any;
  shadow?: string;
  mobile?: boolean;
  name?: string;
  as?: string;
};

const Anchor = forwardRef(
  ({ children, href, className, icon, isActive, onClick, color }: TopLevelProps, ref: any) => {
    const [hovering, setHovering] = useState(false);
    const usePrimaryColorForText = color == null || color.includes('linear-gradient');

    return (
      <a
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={isActive && !usePrimaryColorForText ? { color: color } : {}}
        className={clsx(
          'group flex items-center lg:text-sm lg:leading-6 mb-5 sm:mb-4',
          isActive
            ? [
                'font-semibold',
                usePrimaryColorForText ? 'text-primary dark:text-primary-light' : '',
              ]
            : 'font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300'
        )}
      >
        <div
          style={
            (isActive || hovering) && color
              ? {
                  background: color,
                }
              : {}
          }
          className={clsx(
            'mr-4 rounded-md p-1',
            !color && 'group-hover:bg-primary',
            isActive
              ? [color ? '' : 'bg-primary']
              : 'zinc-box group-hover:brightness-100 group-hover:ring-0 ring-1 ring-zinc-400/25 dark:ring-zinc-700/40'
          )}
        >
          {icon}
        </div>
        {children}
      </a>
    );
  }
);

export function AnchorLink({ ...props }: TopLevelProps) {
  const { href } = props;
  if (/^https?:\/\//.test(href)) {
    return (
      <li>
        <Anchor {...props} />
      </li>
    );
  }

  return (
    <li>
      <Link href={href ?? '/'} legacyBehavior>
        <Anchor {...props} />
      </Link>
    </li>
  );
}

export function StyledAnchorLink({
  href,
  as,
  name,
  icon,
  color,
  isActive,
  ...props
}: TopLevelProps) {
  const AnchorIcon =
    icon == null ? (
      <div className="h-6 w-px"></div>
    ) : (
      <Icon
        icon={icon.toLowerCase()}
        iconType="duotone"
        className={clsx(
          `h-4 w-4 secondary-opacity group-hover:fill-primary-dark group-hover:bg-white`,
          isActive ? 'bg-white' : 'bg-zinc-400 dark:bg-zinc-500'
        )}
      />
    );
  return (
    <AnchorLink {...props} as={as} href={href} icon={AnchorIcon} isActive={isActive} color={color}>
      {name ?? href}
    </AnchorLink>
  );
}