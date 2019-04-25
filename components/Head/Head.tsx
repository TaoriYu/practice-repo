import * as React from 'react';
import NextHead from 'next/head';
import { AppConfigurationService } from '../../config';
import { useStore } from '../../core/provider/StoreContext';
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
  const configService = useStore<AppConfigurationService>(AppConfigurationService);

  return (
    <NextHead>
      <title>{title}</title>
      <ConfigExposer config={configService.publicRuntimeConfig} />
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
