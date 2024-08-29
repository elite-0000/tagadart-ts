import React from 'react';
import clsx from 'clsx';

function Office({
  name,
  children,
  invert = false,
}: {
  name: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600',
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  );
}

interface OfficeProps {
  id: number;
  title: string;
  content: string | null;
}

interface OfficesProps extends React.ComponentPropsWithoutRef<'ul'> {
  offices: OfficeProps[];
  invert?: boolean;
}

export function Offices({
  offices,
  invert = false,
  ...props
}: OfficesProps) {
  console.log('Offices data:', offices); // Log the offices data

  return (
    <ul role="list" {...props}>
      {offices && offices.length > 0 ? (
        offices.map(({ id, title, content }) => (
          <li key={id}>
            <Office name={title} invert={invert}>
              {content ? (
                content.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {line}
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <em>No address provided</em>
              )}
            </Office>
          </li>
        ))
      ) : (
        <li>No offices available</li>
      )}
    </ul>
  );
}