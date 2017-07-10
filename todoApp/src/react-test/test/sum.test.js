
describe('test sum', () => {
    const sum = require('../sum');
    xit('adds 1 + 2 to equals 3', () => {
        expect(sum(1, 2)).toMatchSnapshot();
    });
});


describe('just test jest mock', () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it('test doMock', () => {
        jest.doMock('../SomeClass.js', () => {
            return {
                a: jest.fn(() => console.log('mock,mock'))
            }
        });
        const SomeClass = require('../SomeClass');
        expect(SomeClass.a()).toBeUndefined();
    });



    it('test module1', () => {
        jest.doMock('../SomeClass.js', () => jest.fn(() => 1));
        const SomeClass = require('../SomeClass');
        expect(SomeClass()).toBe(1);
    });

    it('test module2', () => {
        jest.doMock('../SomeClass.js', () => jest.fn(() => 2));
        const SomeClass = require('../SomeClass');
        expect(SomeClass()).toBe(2);
    })

});
describe('test calls', () => {
    const mockFn = jest.fn().mockImplementation(scalar => scalar + 42);
    const a = mockFn(0);
    const b = mockFn(1);
    test('mockImplementation', () => {
        expect(a).toEqual(42);
        expect(b).toEqual(43);
        expect(mockFn.mock.calls[0][0]).toEqual(0);
        expect(mockFn.mock.calls[1][0]).toEqual(1);
    });
});


describe('test spyon', () => {

    const video = require('../video');
    test('test someclass is spied', () => {
        const spy = jest.spyOn(video, 'play');
        const isPlaying = video.play();
        expect(spy).toHaveBeenCalled();
        expect(isPlaying).toBe(true);
    });
});



xdescribe('test mockImplementation', () => {
    beforeEach(() => {
        console.log('test starts');
    })
    jest.enableAutomock();
    const SomeClass = require('../SomeClass');
    const mMock = jest.fn();
    SomeClass.mockImplementation(() => ({
        m: mMock
    }));
    const some = new SomeClass();
    some.m('a', 'b');
    it('test calls to class', () => {
        expect(mMock.mock.calls).toMatchSnapshot();
    })
})




