package run.halo.katex;

public class KaTeXJSInjector {
    static String getParsedKatexScript(String inline_selector, String display_selector) {
        String katexScript = """
            <link rel="stylesheet" href="/plugins/plugin-katex/assets/static/katex.min.css">
            <script defer data-pjax src="/plugins/plugin-katex/assets/static/katex.min.js"></script>
            <script>
                   function initKatex() {
                       const postBody = document.body
                       const renderMath = (selector, displayMode) => {
                           const els = postBody.querySelectorAll(selector)
                           els.forEach((el) => {
                               katex.render(el.innerText, el, { displayMode })
                           })
                       }
                       if (postBody) {
                           renderMath("%s", false);
                           renderMath("%s", true);
                       }
                   }
                   document.addEventListener("DOMContentLoaded", function () {
                       initKatex();
                   });
                   document.addEventListener("pjax:complete", function () {
                       initKatex();
                   });
            </script>
            """;
        return String.format(katexScript, inline_selector, display_selector);
    }
}
