module.exports = {
    // 一行最多多少个字符
    printWidth: 110,
    // 指定每个缩进级别的空格数
    tabWidth: 2,
    // 使用单引号而不是双引号
    singleQuote: true,
    // 使用制表符而不是空格缩进行
    useTabs: false,
    // 在语句末尾打印分号
    semi: false,
    // 在JSX中使用单引号而不是双引号
    jsxSingleQuote: false,
    // 多行时尽可能打印尾随逗号。（例如，单行数组永远不会出现逗号结尾。） 可选值"<none|es5|all>"，默认none
    trailingComma: 'all',
    // 在对象前后添加空格
    bracketSpacing: true,
    // 在单独的箭头函数参数周围包括括号 always：(x) => x \ avoid：x => x
    arrowParens: 'always',
    quoteProps: 'as-needed',
    // 换行符使用 lf 结尾是 可选值"<auto|lf|crlf|cr>"
    endOfLine: 'lf',
    // 对引用代码进行格式化
    embeddedLanguageFormatting: 'auto',
}
