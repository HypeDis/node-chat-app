const expect = require('expect');
let {isRealString} = require('./validation');
//import is real string

//isRealString
    //should reject non string values
    //should reject stings with only spaces
    //should allow strings with non-space chars

    describe('validate string', () => {
        it('should reject non string values', () => {
            const nonString = 123;
            expect(isRealString(nonString)).toBeFalsy();
        });


        it('should reject strings with only spaces', () => {
            const onlySpaces = '        ';
            expect(isRealString(onlySpaces)).toBeFalsy();
        });

        it('should allow strings with non-space characters', () => {
            const validString = '     123megatron   ';
            expect(isRealString(validString)).toBeTruthy();
        });
    });