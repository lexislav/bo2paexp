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
        
        // Start the 'stopwatch' for the profiler.
        $app['stopwatch']->start('bolt.frontend.before');

        // If there are no users in the users table, or the table doesn't exist. Repair
        // the DB, and let's add a new user.
        if (!$app['users']->getUsers()) {
            //!$app['storage']->getIntegrityChecker()->checkUserTableIntegrity() ||
            $app['session']->getFlashBag()->set('info', __('There are no users in the database. Please create the first user.'));

            return redirect('useredit', array('id' => ''));
        }

        $app['debugbar'] = true;
        $app['htmlsnippets'] = true;

        // If we are in maintenance mode and current user is not logged in, show maintenance notice.
        // @see /app/app.php, $app->error()
        if ($app['config']->get('general/maintenance_mode')) {
            if (!$app['users']->isAllowed('maintenance-mode')) {
                $template = $app['config']->get('general/maintenance_template');
                $body = $app['render']->render($template);

                return new Response($body, 503);
            }
        }

        // Stop the 'stopwatch' for the profiler.
        $app['stopwatch']->stop('bolt.frontend.before');
        
        //začátek úpravy multilang
        
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