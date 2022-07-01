import {sum} from "./main";

describe('test main',()=>{
  it('求和 ', function () {
    const r = sum(1,2)
    expect(r).toEqual(3)
  });
})
