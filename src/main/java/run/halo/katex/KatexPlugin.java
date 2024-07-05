package run.halo.katex;

import org.springframework.stereotype.Component;

import run.halo.app.plugin.BasePlugin;
import run.halo.app.plugin.PluginContext;

@Component
public class KatexPlugin extends BasePlugin {

    public KatexPlugin(PluginContext context) {
        super(context);
    }
}
