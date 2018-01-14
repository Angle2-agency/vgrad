<?php

namespace Angleto\BookingBundle\Command;

use Symfony\Bundle\FrameworkBundle\Command\ContainerAwareCommand;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

use Angleto\BookingBundle\Entity\Hotel;
use Angleto\BookingBundle\Entity\Room;
use Angleto\BookingBundle\Entity\Options;
use Angleto\BookingBundle\Entity\RoomGallery;

class DbFixtureCommand extends ContainerAwareCommand
{
    protected function configure()
    {
        $this->setName('booking:dbfixture')
             ->setDescription('Load initial db data');
    }

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $doctrine = $this->getContainer()->get('doctrine');
        $em = $doctrine->getManager();

        $hotel = new Hotel();
        $hotel->setName('Отель')
              ->setType('standart')
              ->setAddress('Вышгород, ул. Спасская 25');

        $imgRoot = '/img/hotels/standart/';
        $gallery = new RoomGallery();

        $rooms = $hotel->getRooms();
        $room = (new Room())->setName('Стандарт')
                            ->setType('standart')
                            ->setPrice(800)
                            ->setHotel($hotel);
        $image = clone $gallery;
        $image->setImage($imgRoot . 'standart.jpg')
              ->setTitle('Standart room');

        $image->setRoom($room);
        $room->getImages()->add($image);
        $rooms->add($room);
        $room = (new Room())->setName('Стандарт улучшеный')
                                ->setType('standart-adv')
                                ->setPrice(900)
                                ->setHotel($hotel);
        $image = clone $gallery;
        $image->setImage($imgRoot . 'standart.jpg')
              ->setTitle('Standart room');
        $image->setRoom($room);
        $room->getImages()->add($image);
        $rooms->add($room);

        $room = (new Room())->setName('Полу люкс')
                                ->setType('half-lux')
                                ->setPrice(1200)
                                ->setHotel($hotel);
        $image = clone $gallery;
        $image->setRoom($room);
        $image->setImage($imgRoot . 'polu_lux_3.jpg')
              ->setTitle('Halh lux');

        $room->getImages()->add($image);
        $rooms->add($room);             

        $room = (new Room())->setName('Люкс')
                                ->setType('lux')
                                ->setPrice(1700)
                                ->setHotel($hotel);

        $image = clone $gallery;    
        $image->setRoom($room);
        $image->setImage($imgRoot . 'lux_s_djakuzi_5.jpg')
              ->setTitle('Lux room');
        $room->getImages()->add($image);
        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'lux_s_kaminom1.jpg')
              ->setTitle('Lux room');
        $room->getImages()->add($image);
        $rooms->add($room);

        $room = (new Room())->setName('VIP')
                                ->setType('vip')
                                ->setPrice(2000)
                                ->setHotel($hotel);
        $image = clone $gallery;    
        $image->setRoom($room);
        $image->setImage($imgRoot . 'vip_s_djakuzi_6.jpg')
              ->setTitle('VIP room');
        $room->getImages()->add($image);
        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'vip_s_kaminom2.jpg')
              ->setTitle('VIP room');
        $room->getImages()->add($image);
        $rooms->add($room);
        
        $em->persist($hotel);

        $hotel = new Hotel();
        $hotel->setName('Мини отель')
              ->setType('mini')
              ->setAddress('Вышгород, ул. Шолуденко 17а');

        $imgRoot = '/img/hotels/mini/';

        $rooms = $hotel->getRooms();

        $room = (new Room())->setName('Стандарт')
                                ->setType('standart')
                                ->setPrice(800)
                                ->setHotel($hotel);

        $image = clone $gallery;    
        $image->setRoom($room);
        $image->setImage($imgRoot . 'standart-double.jpg')
              ->setTitle('Standart room');
        $room->getImages()->add($image);
        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'standart-twin.jpg')
              ->setTitle('Standart room');
        $room->getImages()->add($image);

        $rooms->add($room);

        $room = (new Room())->setName('Полу люкс')
                                ->setType('half-lux')
                                ->setPrice(1200)
                                ->setHotel($hotel);
        $image = clone $gallery;
        $image->setRoom($room);
        $image->setImage($imgRoot . 'half-lux.jpg')
              ->setTitle('Halh lux');

        $room->getImages()->add($image);
        $rooms->add($room);

        $room = (new Room())->setName('Люкс') 
                                ->setType('lux')
                                ->setPrice(1700)
                                ->setHotel($hotel);

        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'lux_s_kaminom.jpeg')
              ->setTitle('Lux room');
        $room->getImages()->add($image);
        $rooms->add($room);

        $room = (new Room())->setName('Элит')
                                ->setType('elite')
                                ->setPrice(2000)
                                ->setHotel($hotel);
        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'lux_s_kaminom.jpeg')
              ->setTitle('Lux room');
        $room->getImages()->add($image);
        $rooms->add($room);

        $room = (new Room())->setName('2-комнатный элит')
                                ->setType('dbl-elite')
                                ->setPrice(2500)
                                ->setHotel($hotel);
        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'lux_s_kaminom.jpeg')
              ->setTitle('Lux room');
        $room->getImages()->add($image);
        $rooms->add($room);

        $room = (new Room())->setName('Show room')
                                ->setType('show-room')
                                ->setPrice(2500)
                                ->setHotel($hotel);
        $image = clone $gallery;   
        $image->setRoom($room);
        $image->setImage($imgRoot . 'Show-room.jpg')
              ->setTitle('show room');
        $room->getImages()->add($image);
        $rooms->add($room);        

        $em->persist($hotel);

        $option = new Options();
        $option->setName('Доп кровать')
               ->setType('addnl-bed')
               ->setPrice(300);
        $em->persist($option);

        $option = new Options();
        $option->setName('Проживание с животным')
               ->setType('pet')
               ->setPrice(300);
        $em->persist($option);

        $em->flush();
        $em->clear();
    }
}