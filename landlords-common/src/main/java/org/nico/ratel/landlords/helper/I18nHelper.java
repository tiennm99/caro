package org.nico.ratel.landlords.helper;

import java.nio.charset.StandardCharsets;
import java.util.Locale;
import java.util.MissingResourceException;
import java.util.ResourceBundle;


public class I18nHelper {

    private I18nHelper() {
    }

    private static final String I18N_BUNDLE_NAME = "messages";

    private static ResourceBundle messageBundle;

    private static volatile boolean enabled = false;

    /**
     * Enable and load internationalization information, using system default language and region
     */
    public static void enable() {
        enable(Locale.getDefault());
    }

    /**
     * Enable and load internationalization with specified language and region
     *
     * @param locale language and region
     */
    public static void enable(Locale locale) {
        if (enabled) {
            System.err.println("[warning] i18n resource has already loaded.");
            return;
        }
        try {
            messageBundle = ResourceBundle.getBundle(I18N_BUNDLE_NAME, locale);
            if (locale != messageBundle.getLocale()) {
                System.err.printf("[warning] missing i18n resource for %s, set locale to %s\n",
                        locale, messageBundle.getLocale());
            }
        } catch (Exception e) {
            System.err.println("[error] load i18n resource error, exception: " + e.getMessage());
            throw e;
        }
        I18nHelper.enabled = true;
    }

    /**
     * Update and reload internationalization resources
     *
     * @param locale language and region
     */
    public static void refresh(Locale locale) {
        if (!enabled) {
            throw new IllegalStateException("i18n not enabled!");
        }
        ResourceBundle bundle;
        try {
            bundle = ResourceBundle.getBundle(I18N_BUNDLE_NAME, locale);
            if (locale != bundle.getLocale()) {
                throw new IllegalStateException("i18n resource of " + locale + " not found");
            }
        } catch (Exception e) {
            if (e instanceof IllegalArgumentException) {
                throw e;
            }
            throw new RuntimeException("load i18n resource of " + locale + "failed, exception: " + e.getMessage());
        }
        messageBundle = bundle;
    }

    /**
     * Translate text
     * <p>Supports formatting, using String.format(format, Object...args)<p/>
     * <p>Keys not in the dictionary will be displayed as-is</p>
     *
     * @param key  language key to be translated
     * @param args parameters
     */
    public static String translate(String key, Object... args) {
        if (!enabled) {
            return format(key, args);
        }
        try {
            String t = messageBundle.getString(key);
            return format(new String(t.getBytes(StandardCharsets.ISO_8859_1), StandardCharsets.UTF_8), args);
        } catch (MissingResourceException e) {
            return format(key, args);
        }
    }

    /**
     * Get current language and region
     */
    public static Locale getCurrentLocale() {
        return messageBundle == null ? null : messageBundle.getLocale();
    }

    private static String format(String template, Object... args) {
        return String.format(template, args);
    }
}
