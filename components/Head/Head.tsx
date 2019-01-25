import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import NextHead from 'next/head';
import { ConfigExposer } from './ConfigExposer';
import { Links } from './Links';
import { Meta, MetaOg, MetaTwitter } from './Meta';

interface IHeadProps {
  title?: string;
  description?: string;
  ogUrl?: string;
  ogImage?: string;
}

export function Head({ description, ogImage, ogUrl, title }: IHeadProps) {
  return (
    <NextHead>
      { process.env.NODE_ENV === 'development' && <DevTools /> }
      <title>{title}</title>
      <ConfigExposer />
      <Meta description={description} />
      <MetaTwitter url={ogUrl} image={ogImage} />
      <MetaOg
        description={description}
        title={title}
        image={ogImage}
        url={ogUrl}
      />
      <Links />
    </NextHead>
  );
}
