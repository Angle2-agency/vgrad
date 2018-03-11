<?php

namespace Angleto\BookingBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Angleto\BookingBundle\Repository\HotelRepository;

/**
 * HotelEn
 *
 * @ORM\Table(name="hotel_ua")
 * @ORM\Entity(repositoryClass="Angleto\BookingBundle\Repository\HotelRepositoryUa")
 */
class HotelUa
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=50)
     */
    private $name;

    /**
     * 
     * @ORM\Column(type="string", length=100)
     */
    private $address;

    /**
     * @var string
     *
     * @ORM\Column(name="type", type="string", length=30)
     */
    private $type;

    /**
     * 
     * 
     * @ORM\OneToMany(targetEntity="RoomUa", mappedBy="hotel", cascade={"persist", "remove"})
     */
    private $rooms;

    public function __construct()
    {
        $this->rooms = new ArrayCollection();
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     *
     * @return Hotel
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set type
     *
     * @param string $type
     *
     * @return Hotel
     */
    public function setType($type)
    {
        $this->type = $type;

        return $this;
    }

    /**
     * Get type
     *
     * @return string
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * @return mixed
     */
    public function getRooms()
    {
        return $this->rooms;
    }

    /**
     * @param mixed $rooms
     *
     * @return self
     */
    public function setRooms($rooms)
    {
        $this->rooms = $rooms;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param mixed $address
     *
     * @return self
     */
    public function setAddress($address)
    {
        $this->address = $address;

        return $this;
    }
}

