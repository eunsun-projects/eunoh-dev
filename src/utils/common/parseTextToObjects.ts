function parseTextToObjects(text: string) {
  // 입력된 텍스트를 '/'로 분리하여 각 주제-내용 쌍을 나눔
  const pairs = text.split(' / ');

  if (pairs.length === 0 || pairs[0] === '') {
    return [];
  }
  // 각 쌍을 ':'로 나누어 객체 배열로 변환
  const result = pairs.map((pair) => {
    const [subTitle, subContent] = pair.split(' : ');
    return { subTitle: subTitle.trim(), subContent: subContent.trim() };
  });

  return result;
}

export default parseTextToObjects;
