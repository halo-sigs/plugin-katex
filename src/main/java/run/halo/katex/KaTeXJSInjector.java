package run.halo.katex;

public class KaTeXJSInjector {
    static String getParsedKatexScript(String inline_selector, String display_selector) {
        String katexScript = """
            <script data-pjax>
              function renderMath(selector,displayMode) {
                const els = document.body.querySelectorAll(selector)
                els.forEach((el) => {
                  katex.render(el.innerText, el, { displayMode })
                })
              }
              renderMath("%s",false);
              renderMath("%s",true);
            </script>
            """;
        return String.format(katexScript, inline_selector, display_selector);
    }
}