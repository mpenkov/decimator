test("sanity check", function() {
    ok(parse_string("一") === 1,                "一");
    ok(parse_string("二") === 2,                "二");
    ok(parse_string("三") === 3,                "三");
    ok(parse_string("四") === 4,                "四");
    ok(parse_string("五") === 5,                "五");
    ok(parse_string("六") === 6,                "六");
    ok(parse_string("七") === 7,                "七");
    ok(parse_string("八") === 8,                "八");
    ok(parse_string("九") === 9,                "九");
    ok(parse_string("十") === 10,               "十");
    ok(parse_string("百") === 100,              "百");
    ok(parse_string("千") === 1000,             "千");
    ok(parse_string("万") === 10000,            "万");
    ok(parse_string("億") === 100000000,        "億");
    ok(parse_string("兆") === 1000000000000,    "兆");
    ok(parse_string("1234567890") === 1234567890, "1234567890");
});

test("simple combinations", function() {
    ok(parse_string("二十"          ) === 20,             "二十"          );
    ok(parse_string("二十一"        ) === 21,             "二十一"        );
    ok(parse_string("三百"          ) === 300,            "三百"          );
    ok(parse_string("三百五十"      ) === 350,            "三百五十"      );
    ok(parse_string("三百五十九"    ) === 359,            "三百五十九"    );

    ok(parse_string("千百"          ) === 1100,           "千百"          );
    ok(parse_string("千四百"        ) === 1400,           "千四百"        );
    ok(parse_string("千四百七十"    ) === 1470,           "千四百七十"    );
    ok(parse_string("千四百七十三"  ) === 1473,           "千四百七十三"  );

    ok(parse_string("五千四百七十三") === 5473,           "五千四百七十三");

    ok(parse_string("10万") == 100000, "10万");
    ok(parse_string("10万2千") == 102000, "10万2千");
});

test("tricky combinations", function() {
    ok(parse_string("千五百万"      ) === 15000000,       "千五百万"      );
    ok(parse_string("千5百万"      ) === 15000000,       "千5百万"     );
    ok(parse_string("千500万"      ) === 15000000,       "千500万"     );
});

test("wikipedia", function() {
    ok(parse_string("十一")                             === 11,         "十一");
    ok(parse_string("十七")                             === 17,         "十七");
    ok(parse_string("百五十一")                         === 151,        "百五十一");
    ok(parse_string("三百二")                           === 302,        "三百二");
    ok(parse_string("四百六十九")                       === 469,        "四百六十九");
    ok(parse_string("二千二十五")                       === 2025,       "二千二十五");
    ok(parse_string("九百八十三万 六千七百三")          === 9836703,    "九百八十三万 六千七百三");
    ok(parse_string("二十億 三千六百五十二万千八百一")  === 2036521801, "二十億 三千六百五十二万千八百一");
    ok(parse_string("千五百万")                         === 15000000,   "千五百万");
    ok(parse_string("一千五百万")                       === 15000000,   "一千五百万");
    ok(parse_string("一千万")                           === 10000000,   "一千万");
});
