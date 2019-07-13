/* tslint:disable:file-name-casing */
import '../di/container';

import * as React from 'react';
import '../components/Less/notImportedGlobals.less';
import DevTools from 'mobx-react-devtools';
import { Container, NextAppContext } from 'next/app';
import { enableLogger } from '../core/logger';
import { IAppProps, TemplateApp } from '../core/next/TemplateApp';
import { Provider } from '../core/provider/StoreContext';

enableLogger();

// tslint:disable-next-line:no-default-export
export default class App extends TemplateApp {
  /**
   * Тут можно расширять контекст приложения (он будет доступен в props в методе template);
   * Если требуется сделать асинхронный запрос на сервер обратите внимание на
   * '../ignition'
   */
  public static async getInitialProps(appContext: NextAppContext): Promise<IAppProps> {
    return super.getInitialProps(appContext);
  }

  /**
   * Тут можно писать точно такой-же код как и в методе render, результат будет возвращен
   * без каких либо изменений.
   */
  public template() {
    const { Component, pageProps, statusCode, router } = this.props;

    return (
      <Container>
        <Provider value={this.appContext}>
          {process.env.NODE_ENV === 'development' && <DevTools />}
          <Component {...pageProps} statusCode={statusCode} url={this.createUrl(router)} />
        </Provider>
      </Container>
    );
  }
}
