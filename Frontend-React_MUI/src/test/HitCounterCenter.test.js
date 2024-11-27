import '@testing-library/jest-dom/extend-expect';
import HitCountCenter from '../components/ola-custom/HitCountCenter';
import api from '../services/api';
describe('Test HitCountCenter Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('Testing Call hitCount function', async () => {
    const hitCount = jest.spyOn(HitCountCenter, 'hitCount');
    HitCountCenter.hitCount('test-xx-11-22-tt', '231101000001', 'test');
    expect(hitCount).toBeCalled();
  });

  it('Testing Not Call hitCount function', async () => {
    const hitCount = jest.spyOn(HitCountCenter, 'hitCount');
    expect(hitCount).not.toBeCalled();
  });

  it('Testing Return Value hitCount function', async () => {
    const hitCountReturnValue = jest.spyOn(HitCountCenter, 'hitCount').mockReturnValue();
    HitCountCenter.hitCount('test-xx-11-22-tt', '231101000001', 'test');
    expect(hitCountReturnValue).toHaveBeenCalled();
  });

  it('Testing Implementation hitCount function', async () => {
    const hitCountReturnValue = jest.spyOn(HitCountCenter, 'hitCount').mockImplementation();
    HitCountCenter.hitCount('test-xx-11-22-tt', '231101000001', 'test');
    expect(hitCountReturnValue).toHaveBeenCalled();
  });

  it('Testing SpyOn hitCount function when Call API', async () => {
    const hitCount = jest.spyOn(HitCountCenter, 'hitCount');
    expect(hitCount).not.toBeCalled();
    const callApi = jest.spyOn(api, 'postHitCounter');
    api.postHitCounter('test-xx-11-22-tt', '231101000001', 'test');
    expect(callApi).toHaveBeenCalled();;
  });
});
