import { checkFreeTextLength, checkCommentLength } from '.';

describe('자유 의견란의 길이를 검사한다.', () => {
  test('문자열의 길이가 100을 넘을 경우', () => {
    expect(
      checkFreeTextLength(
        'non tellus orci ac auctor augue mauris augue neque gravida in fermentum et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum odio eu feugiat pretium nibh ipsum consequat nisl vel pretium lectus quam id leo in vitae turpis massa sed elementum tempus egestas sed sed risus pretium quam vulputate dignissim suspendisse in est ante in nibh mauris cursus mattis molestie a iaculis at erat pellentesque adipiscing commodo elit at imperdiet dui accumsan sit amet nulla facilisi morbi tempus iaculis urna id volutpat lacus laoreet non curabitur gravida arcu ac tortor dignissim convallis'
      )
    ).toBe(false);
  });
  test('문자열의 길이가 0일 경우', () => {
    expect(checkFreeTextLength('')).toBe(false);
  });
  test('문자열의 길이가 1이상, 100 이하일 경우', () => {
    expect(
      checkFreeTextLength(
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean m'
      )
    ).toBe(true);
  });
});

describe('댓글의 길이를 검사한다.', () => {
  test('댓글의 길이가 50을 넘을 경우', () => {
    expect(
      checkCommentLength(
        'tellus at urna condimentum mattis pellentesque id nibh tortor id aliquet lectus proin nibh nisl condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas sed tempus urna et pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna eget est'
      )
    ).toBe(false);
  });
  test('댓글의 길이가 0일 경우', () => {
    expect(checkCommentLength('')).toBe(false);
  });
  test('댓글의 길이가 1이상 50 이하일 경우', () => {
    expect(
      checkCommentLength('Lorem ipsum dolor sit amet, consectetuer adipiscin')
    ).toBe(true);
  });
});
