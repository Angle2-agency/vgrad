<?php

namespace AdminBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use AdminBundle\Entity\ContentBlock;
use AdminBundle\Entity\ContentBlockEn;
use AdminBundle\Entity\ContentBlockUa;
use AdminBundle\Entity\ContentBlockImage;
use AdminBundle\Entity\ContentBlockImageEn;
use AdminBundle\Entity\ContentBlockImageUa;

class LandingController extends LangualController
{
    /**
     * @Route("/admin")
     * @return Reponse
     */
    public function admin()
    {
        return $this->redirect('/admin/landing');
    }
    /**
     * @Route("/admin/landing")
     * 
     */
    public function index(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $blocksRepo = $em->getRepository(
            $this->getContentBlockClass()
        );
        $formated = [];
        $blocks = $blocksRepo->findAll();
        foreach ($blocks as $block) {
            $formated[$block->getIdentifier()] = $block;
        }

        return $this->render('admin/landing.html.twig', [
            'blocks' => $formated,
            'lang' => $this->getLang()
        ]);
    }

    /**
     * save content of the block
     * @Route("/admin/landing/save")
     * @param  Request $request 
     * @return Response
     */
    public function save(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getContentBlockClass()
        );

        $block = $repo->findOneByIdentifier($request->get('block'));

        $block->setTitle($request->get('title'));
        $block->setContent($request->get('content'));

        $em->persist($block);
        $em->flush();
        $em->clear();
        $this->addFlash('info', 'Изменения успешно сохранены');
         
        return $this->redirect('/admin/landing');
    }

    /**
     * @Route("/admin/landing/destroyimage/{id}")
     * 
     * @return Response
     */
    public function destroyImage(Request $request)
    {   
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getContentImageClass()
        );
        $image = $repo->findOneById($request->get('id'));
        $block = $image->getBlock();
        $em->remove($image);

        // recalculate all positions
        $pos = 0;
        foreach ($block->getImages() as $blockimage) {
            if ($blockimage->getId() == $image->getId()) {
                continue;
            }
            $blockimage->setPosition(++$pos);
            $em->persist($blockimage);
        }
        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Изображение успешно удалено');
        
        return $this->redirect('/admin/landing');
    }

    /**
     * @Route("/admin/landing/uploadimage");
     *
     * @return Response
     */
    public function upload(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getContentBlockClass()
        );
        $block = $repo->findOneByIdentifier($request->get('block'));
        
        $lastPosition = -1;
        if (!$block->getImages()->isEmpty()) {
            $lastPosition = $block->getImages()->last()->getPosition();
        }
        if (!$request->get('isvideo')) {
            $image = $request->files->get('image');
            $webName = sprintf('/img/uploads/%s', $image->getClientOriginalName());
            $savePath = sprintf('%s/web/img/uploads', $this->get('kernel')->getProjectDir());
            $image->move($savePath, $image->getClientOriginalName());
        }
        $image = $this->getContentBlockImage();
        $image->setTitle($request->get('title'))
              ->setDescription($request->get('description'))
              ->setPosition($lastPosition + 1);
        if (isset($webName)) {
            $image->setImage($webName);
        }
        $image->setBlock($block);
        $block->getImages()->add($image);

        $em->persist($block);
        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Изображение успешно добавлено');
        
        return $this->redirect('/admin/landing');
    }

    /**
     * @Route("/admin/landing/updateimage")
     * 
     */
    public function updateimage(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getContentImageClass()
        );

        $image = $repo->findOneById($request->get('id'));
        $image->setTitle($request->get('title'))
              ->setDescription($request->get('description'));

        $em->persist($image);
        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Изображение успешно изменено');
        
        return $this->redirect('/admin/landing');
    }

    /**
     * @Route("/admin/landing/image/{id}/move/{direction}")
     * 
     */
    public function moveimage(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $repo = $em->getRepository(
            $this->getContentImageClass()
        );

        $image = $repo->findOneById($request->get('id'));
        $nearest = null;
        if ($request->get('direction') == 'left') {
            $nearest = $repo->findOneBy(
                [
                    'block' => $image->getBlock(),
                    'position' => $image->getPosition() - 1
                ]
            );
        } else {
            $nearest = $repo->findOneBy(
                [
                    'block' => $image->getBlock(),
                    'position' => $image->getPosition() + 1
                ]
            );
        }

        // swap positions
        $nearestPosition = $nearest->getPosition();
        $nearest->setPosition($image->getPosition());
        $image->setPosition($nearestPosition);

        $em->persist($image);
        $em->persist($nearest);

        $em->flush();
        $em->clear();

        $this->addFlash('info', 'Позиция успешно изменена');
        
        return $this->redirect('/admin/landing');
    }

    private function getContentBlockClass()
    {
        switch ($this->getLang()) {
            case self::LANG_EN:
                return ContentBlockEn::class;
            break;
            case self::LANG_UA:
                return ContentBlockUA::class;
            break;
            case self::LANG_RU:
            default:
                return ContentBlock::class;
            break;
        }
    }

    private function getContentBlockImage()
    {
        switch ($this->getLang()) {
            case self::LANG_EN:
                return new ContentBlockImageEn();
            break;
            case self::LANG_UA:
                return new ContentBlockImageUa();
            break;
            case self::LANG_RU:
            default:
                return new ContentBlockImage();
            break;
        }
    }

    private function getContentImageClass()
    {
        switch ($this->getLang()) {
            case self::LANG_EN:
                return ContentBlockImageEn::class;
            break;
            case self::LANG_UA:
                return ContentBlockImageUa::class;
            break;
            case self::LANG_RU:
            default:
                return ContentBlockImage::class;
            break;
        }
    }
}