package run.halo.katex;

import java.util.Properties;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.PluginContext;
import run.halo.app.plugin.ReactiveSettingFetcher;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

@Component
@RequiredArgsConstructor
public class KaTeXHeadProcessor implements TemplateHeadProcessor {

    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER =
        new PropertyPlaceholderHelper("${", "}");

    private final PluginContext pluginContext;

    private final ReactiveSettingFetcher reactiveSettingFetcher;

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        final IModelFactory modelFactory = context.getModelFactory();
        return getHeadTags()
            .map(headTags -> {
                model.add(modelFactory.createText(headTags));
                return headTags;
            })
            .then();
    }

    private Mono<String> getHeadTags() {
        final Properties properties = new Properties();
        properties.setProperty("version", pluginContext.getVersion());

        return reactiveSettingFetcher.fetch("basic", BasicConfig.class)
            .map(basicConfig -> {
                var headTags = """
                    <!-- plugin-katex start -->
                    <link rel="stylesheet" href="/plugins/plugin-katex/assets/static/katex.min.css?version=${version}" />
                    """;
                if (basicConfig.isEnable_frontend_katex()) {
                    headTags += """
                        <script src="/plugins/plugin-katex/assets/static/katex.min.js?version=${version}"></script>
                        """;
                }
                headTags += """
                    <!-- plugin-katex end -->
                    """;
                return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders(headTags, properties);
            });
    }
}
