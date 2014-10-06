<?php
namespace Bolt\Controllers;

use Bolt\Application;
use Bolt\Controllers\Frontend as BoltFrontend;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class Multilang
{
    /**
     * Enforce locale requirement
     */
    public static function before(Request $request, Application $app)
    {
        BoltFrontend::before($request, $app);
        $locales = $app['config']->get('general/i18n_locales', NULL);

        if ($locales && $request->getLocale()) {
            if (!in_array($request->getLocale(), $locales)) {
                $app->abort(404, $app['translator']->trans('Unknown or unsupported locale.'));
            }
        }
    }

    /**
     * Redirect / to /{default_locale}
     */
    public static function i18nFront(Request $request, Application $app)
    {
        $locales = $app['config']->get('general/i18n_locales', NULL);

        if ($locales) {
            return $app->redirect($app['paths']['root'] . $request->getPreferredLanguage($locales));
        }
    }
}
?>