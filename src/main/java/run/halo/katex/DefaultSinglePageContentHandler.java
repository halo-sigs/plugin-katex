package run.halo.katex;

import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.theme.ReactiveSinglePageContentHandler;

@Component
public class DefaultSinglePageContentHandler implements ReactiveSinglePageContentHandler {

    @Override
    public Mono<SinglePageContent> handle(SinglePageContent postContent) {

        String katexScript = """
            <link rel="stylesheet" href="/plugins/plugin-katex/assets/static/katex.min.css">
            <script defer src="/plugins/plugin-katex/assets/static/katex.min.js"></script>
            <script defer src="/plugins/plugin-katex/assets/static/contrib/auto-render.min.js"></script>
            <script>
                document.addEventListener("DOMContentLoaded", function() {
                    renderMathInElement(document.body, {
                      // customised options
                      // • auto-render specific keys, e.g.:
                      delimiters: [
                          {left: '$$', right: '$$', display: true},
                          {left: '$', right: '$', display: false},
                          {left: '\\(', right: '\\)', display: false},
                          {left: '\\[', right: '\\]', display: true}
                      ],
                      // • rendering keys, e.g.:
                      throwOnError : false
                    });
                });
            </script>
            """;

        postContent.setContent(katexScript + "\n" + postContent.getContent());
        return Mono.just(postContent);
    }
}
