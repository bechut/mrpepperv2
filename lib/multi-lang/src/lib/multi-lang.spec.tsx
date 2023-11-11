import { initI18Next } from './multi-lang';

describe('MultiLang', () => {
  it('should init successfully', () => {
    const i18next = initI18Next({}, {});
    expect(i18next.isInitialized).toBeTruthy();
  });
});
