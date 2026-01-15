package run.halo.katex;

import lombok.Data;

@Data
public class BasicConfig {
    boolean enable_frontend_katex;
    String inline_selector;
    String display_selector;
}
