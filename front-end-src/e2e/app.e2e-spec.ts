import { FrontEndSrcPage } from './app.po';

describe('front-end-src App', () => {
  let page: FrontEndSrcPage;

  beforeEach(() => {
    page = new FrontEndSrcPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
