import * as Fathom from '../src';

const args = function() {
  return arguments;
};

beforeEach(() => {
  window.fathom = undefined;
});

describe('load', () => {
  it('injects the Fathom script', () => {
    const firstScript = document.createElement('script');
    document.body.appendChild(firstScript);
    Fathom.load();

    const fathomScript = document.getElementById('fathom-script');
    expect(fathomScript.src).toBe('http://cdn.usefathom.com/tracker.js');
    expect(typeof window.fathom).toBe('function');
  });
});

describe('setSiteId', () => {
  it('enqueues the operation if fathom is not loaded', () => {
    Fathom.setSiteId('XXX');
    expect(window.fathom.q).toContainEqual(args('set', 'siteId', 'XXX'));
  });

  it('calls the fathom function if loaded', () => {
    return new Promise(resolve => {
      window.fathom = (...args) => {
        expect(args).toStrictEqual(['set', 'siteId', 'XXX']);
        resolve();
      };

      Fathom.setSiteId('XXX');
    });
  });
});

describe('trackPageview', () => {
  it('enqueues the operation if fathom is not loaded', () => {
    Fathom.trackPageview();
    expect(window.fathom.q).toContainEqual(args('trackPageview'));
  });

  it('calls the fathom function if loaded', () => {
    return new Promise(resolve => {
      window.fathom = (...args) => {
        expect(args).toStrictEqual(['trackPageview']);
        resolve();
      };

      Fathom.trackPageview();
    });
  });
});

describe('trackGoal', () => {
  it('enqueues the operation if fathom is not loaded', () => {
    Fathom.trackGoal('Sign Up', 0);
    expect(window.fathom.q).toContainEqual(args('trackGoal', 'Sign Up', 0));
  });

  it('calls the fathom function if loaded', () => {
    return new Promise(resolve => {
      window.fathom = (...args) => {
        expect(args).toStrictEqual(['trackGoal', 'Sign Up', 0]);
        resolve();
      };

      Fathom.trackGoal('Sign Up', 0);
    });
  });
});
