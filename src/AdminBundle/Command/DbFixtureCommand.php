<?php

namespace AdminBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use AdminBundle\Entity\ContentBlock;
use AdminBundle\Entity\ContentBlockImage;

class DbFixtureCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this->setName('admin:dbfixture')
             ->setDescription('Load initial db data');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $doctrine = $this->getContainer()->get('doctrine');
        $em = $doctrine->getManager();

        $block = new ContentBlock('FIRST_BLOCK');
        $title = 'Ваш комфортный<br>загородный<br>отдых';
        $images = [
            '/img/slides/1.jpg', '/img/slides/2.jpg', '/img/slides/3.jpg', '/img/slides/4.jpg'
        ];
        $pos = 0;
        foreach ($images as $image) {
            $ci = new ContentBlockImage();
            $ci->setTitle($title)
               ->setImage($image)
               ->setBlock($block)
               ->setPosition(++$pos);

            $block->getImages()->add($ci);
        }
        $em->persist($block);

        // сеть отелей
        $block = new ContentBlock('SECOND_BLOCK');
        $block->setTitle('Сеть отелей Вышеград');
        $block->setContent('Это комплекс обьединяющий в себе современный комфорт цивилизации со сказочным и таинственным духом средневековья.');

        $image = new ContentBlockImage();
        $image->setImage('/img/castle-photo.png');
        $image->setBlock($block);
        $block->getImages()->add($image);
        $em->persist($block);

        //окружим вас всяческим
        $block = new ContentBlock('THIRD_BLOCK');
        $block->setTitle('Окружим Вас');
        $gallery = [
            'Индвидуальным подходом' => '/img/surrounding-1.jpg',
            'Домашним уютом' => '/img/surrounding-2.jpg',
            'Безопасностью' => '/img/surrounding-3.jpg'
        ];
        $pos=0;
        foreach ($gallery as $title => $image) {
            $ci = new ContentBlockImage();
            $ci->setTitle($title)
               ->setImage($image)
               ->setBlock($block)
               ->setPosition(++$pos);

            $block->getImages()->add($ci);
        }
        $em->persist($block);

        //rooms
        $block = new ContentBlock('ROOMS');
        $block->setTitle('Выбор номеров');
        $block->setContent('Cделает ваш отдых действительно индивидуальным!');
        $gallery = [
            'Стандарт' => ['/img/hotels/standart/standart.jpg'],
            'Стандарт Улучшенный' => ['/img/hotels/standart/standart.jpg'],
            'Полу люкс' => ['/img/hotels/standart/polu_lux_3.jpg'],
            'Люкс' => ['/img/hotels/standart/lux_s_kaminom1.jpg'],
            'ВИП' => ['/img/hotels/standart/vip_s_djakuzi_6.jpg', '/img/hotels/standart/vip_s_kaminom2.jpg'],
            'Стандарт (Мини отель)' => ['/img/hotels/mini/standart-twin.jpg', '/img/hotels/mini/standart-double.jpg'],
            'Шоурум (Мини отель)' => ['/img/hotels/mini/Show-room.jpg'],
            'Полу люкс (Мини отель)' => ['/img/hotels/mini/half-lux.jpg'],
            'Люкс (Мини отель)' => ['/img/hotels/mini/lux.jpeg', '/img/hotels/mini/lux_s_kaminom.jpeg']
        ];
        $pos=0;
        foreach ($gallery as $title => $images) {
            foreach ($images as $image) {
                $ci = new ContentBlockImage();
                $ci->setTitle($title)
                   ->setImage($image)
                   ->setBlock($block)
                   ->setPosition(++$pos);

                $block->getImages()->add($ci);
            }
        }
        $em->persist($block);

        $block = new ContentBlock('SPA');
        $block->setTitle('Spa Услуги');
        $block->setContent('делает ваш отдых действительно индивидуальным!');
        
        $images = [
            '/img/spa/1.jpg', '/img/spa/2.jpg', '/img/spa/3.jpg', '/img/spa/4.jpg',
            '/img/spa/5.jpg', '/img/spa/6.jpg', '/img/spa/7.jpg', '/img/spa/8.jpg',
            '/img/spa/9.jpg', '/img/spa/10.jpg',
        ];
        $pos=0;
        foreach ($images as $image) {
            $ci = new ContentBlockImage();
            $ci->setImage($image)
               ->setBlock($block)
               ->setPosition(++$pos);

            $block->getImages()->add($ci);
        }
        $em->persist($block);

        // uniqu
        $block = new ContentBlock('UNIQUE');
        $block->setTitle('Уникальные предложения');

        $gallery = [
            'Уникальное предложение от Spa' => [
                'img' => '/img/uniqueoffers-1.jpg',
                'desc' => 'Посещение SPA на целый день<br>Пн-Пт - 200 грн<br>Сб-Вс - 250 грн<br>В стоимость входит : бассейн с морской водой, джакузи, хаммам, сауна, Релакс-зона, полотенце, тапочки.'
            ],
            'Спец предложение для конференций' => [
                'img' => '/img/uniqueoffers-2.jpg',
                'desc' => 'Индивидуально. Качественно. Доступно.<br>5 залов до 250 чел<br>84 номера для поселения<br>Качественное обслуживание<br>Блюда от Шеф - повара ,,Вышеград" с 18-ти летним опытом работы<br>Для нас нет нечего невозможного!'
            ],
            'Банкеты высокого качества со скидкой до 20%' => [
                'img' => '/img/uniqueoffers-3.jpg',
                'desc' => ' - <a href="https://www.facebook.com/497547333746506/photos/a.497547523746487.1073741838.497547333746506/541401369361102/?type=3&theater" target="_blank">Банкетный</a> зал (250 чел)<br>- Панорамный ресторан на 6 этаже (150 чел)<br>- Панорамный ресторан с двориком (60 чел)<br>- Главный ресторан (100 чел)<br>- Вип - зал (20 чел)<br>- Организация <a href="http://www.svadba-vyshegrad.com/" target="_blank">свадеб</a>'
            ],
        ];
        $pos =0;
        foreach ($gallery as $title => $image) {
            $ci = new ContentBlockImage();
            $ci->setTitle($title)
               ->setImage($image['img'])
               ->setDescription($image['desc'])
               ->setPosition(++$pos)
               ->setBlock($block);

            $block->getImages()->add($ci);
        }
        $em->persist($block);

        //прогулки
        $block = new ContentBlock('WALK');
        $block->setTitle('Прогулки');
        $block->setContent('Настоящий замок со средневековой архитектурой. Уединенность и тихий отдых на лоне природы с видом на тихую гладь местного озера.');

        $image = new ContentBlockImage();
        $image->setImage('/img/castle-photo.png');
        $image->setBlock($block);
        $block->getImages()->add($image);
        $em->persist($block);

        $block = new ContentBlock('CONTACTS');
        $block->setContent('<div class="label">Звоните нам</div>
                    <div class="info">Отель: 044 331 75 75</div>
                    <div class="info" style="margin-top: -10px;">Мини отель: ‎050 380 90 09</div>                  
                    <div class="label">E - mail адрес</div>
                    <div class="info">hotelvyshegrad@ukr.net</div>
                    <div class="label">Наш адрес</div>
                    <div class="info">ул.Спасская, 25, г. Вышгород</div>
                    <div class="info" style="margin-top: -10px;">ул.Шолуденко, 17а, г. Вышгород</div>');
        $em->persist($block);

        $em->flush();
        $em->clear();
    }
}