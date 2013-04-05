test('sanity', function() {
  equal(parse_string('一'), 1, '一') ,
  equal(parse_string('二'), 2, '二') ,
  equal(parse_string('三'), 3, '三') ,
  equal(parse_string('四'), 4, '四') ,
  equal(parse_string('五'), 5, '五') ,
  equal(parse_string('六'), 6, '六') ,
  equal(parse_string('七'), 7, '七') ,
  equal(parse_string('八'), 8, '八') ,
  equal(parse_string('九'), 9, '九') ,
  equal(parse_string('十'), 10, '十') ,
  equal(parse_string('百'), 100, '百') ,
  equal(parse_string('千'), 1000, '千') ,
  equal(parse_string('万'), 10000, '万') ,
  equal(parse_string('億'), 100000000, '億') ,
  equal(parse_string('兆'), 1000000000000, '兆')
});

test('simple', function() {
  equal(parse_string('二十'), 20, '二十') ,
  equal(parse_string('二十一'), 21, '二十一') ,
  equal(parse_string('三百'), 300, '三百') ,
  equal(parse_string('三百五十'), 350, '三百五十') ,
  equal(parse_string('三百五十九'), 359, '三百五十九') ,
  equal(parse_string('千百'), 1100, '千百') ,
  equal(parse_string('千四百'), 1400, '千四百') ,
  equal(parse_string('千四百七十'), 1470, '千四百七十') ,
  equal(parse_string('千四百七十三'), 1473, '千四百七十三') ,
  equal(parse_string('五千四百七十三'), 5473, '五千四百七十三') ,
  equal(parse_string('10万'), 100000, '10万') ,
  equal(parse_string('10万2千'), 102000, '10万2千')
});

test('tricky', function() {
  equal(parse_string('千五百万'), 15000000, '千五百万') ,
  equal(parse_string('千5百万'), 15000000, '千5百万') ,
  equal(parse_string('千500万'), 15000000, '千500万') ,
  equal(parse_string('130千百万'), 1301000000, '130千百万')
  equal(parse_string('７兆3千4万'), 7000030040000, '７兆3千4万')
  equal(parse_string('3千4万'), 30040000, '3千4万')
  equal(parse_string('3千4'), 3004, '3千4')
});

test('wikipedia', function() {
  equal(parse_string('十一'), 11, '十一') ,
  equal(parse_string('十七'), 17, '十七') ,
  equal(parse_string('百五十一'), 151, '百五十一') ,
  equal(parse_string('三百二'), 302, '三百二') ,
  equal(parse_string('四百六十九'), 469, '四百六十九') ,
  equal(parse_string('二千二十五'), 2025, '二千二十五') ,
  equal(parse_string('九百八十三万六千七百三'), 9836703, '九百八十三万六千七百三') ,
  equal(parse_string('二十億三千六百五十二万千八百一'), 2036521801, '二十億三千六百五十二万千八百一') ,
  equal(parse_string('千五百万'), 15000000, '千五百万') ,
  equal(parse_string('一千五百万'), 15000000, '一千五百万') ,
  equal(parse_string('一千万'), 10000000, '一千万')
});

