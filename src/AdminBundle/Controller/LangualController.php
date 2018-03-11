<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LangualController extends Controller
{
    const LANG_RU  = 'ru';
    const LANG_EN = 'en';
    const LANG_UA = 'ua';
    const LANG_DEFAULT = self::LANG_RU;

    /**
     * @Route("/admin/setlanguage/{lang}")
     * @param Request $request [description]
     */
    public function setLangAction(Request $request)
    {
        $lang = $request->get('lang');
        if (empty($lang) || !in_array($lang, [self::LANG_RU, self::LANG_EN, self::LANG_UA])) {
            $lang = self::LANG_DEFAULT;
        }
        $this->container->get('session')->set('__ADMIN_LANG__', $lang);

        return $this->redirect('/admin');
    }

    protected function getLang()
    {
        return $this->container->get('session')->get('__ADMIN_LANG__', self::LANG_DEFAULT);
    }
}