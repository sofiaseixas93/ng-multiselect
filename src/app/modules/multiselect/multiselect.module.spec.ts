import { MultiselectModule } from './multiselect.module';

describe('MultiselectModule', () => {
  let multiselectModule: MultiselectModule;

  beforeEach(() => {
    multiselectModule = new MultiselectModule();
  });

  it('should create an instance', () => {
    expect(multiselectModule).toBeTruthy();
  });
});
