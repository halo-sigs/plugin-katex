package run.halo.katex;

import com.google.common.base.Throwables;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.ReactivePostContentHandler;

@Component
@RequiredArgsConstructor
@Slf4j
public class DefaultPostContentHandler implements ReactivePostContentHandler {

    private final ReactiveSettingFetcher reactiveSettingFetcher;

    private static void injectJS(PostContentContext contentContext, String inline_selector,
        String display_selector) {
        String parsedKatexScript =
            KaTeXJSInjector.getParsedKatexScript(inline_selector, display_selector);
        contentContext.setContent(contentContext.getContent() + "\n" + parsedKatexScript);
    }

    @Override
    public Mono<PostContentContext> handle(PostContentContext contentContext) {
        return reactiveSettingFetcher.fetch("basic", BasicConfig.class).map(basicConfig -> {
            if (basicConfig.isEnable_frontend_katex()) {
                injectJS(contentContext, basicConfig.getInline_selector(),
                    basicConfig.getDisplay_selector());
            }
            return contentContext;
        }).onErrorResume(e -> {
            log.error("KaTeX PostContent handle failed", Throwables.getRootCause(e));
            return Mono.just(contentContext);
        });
    }
}