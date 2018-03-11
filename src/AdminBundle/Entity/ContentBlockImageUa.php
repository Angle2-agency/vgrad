<?php

namespace AdminBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * ContentBlockImage
 *
 * @ORM\Table(name="content_block_image_ua")
 * @ORM\Entity(repositoryClass="AdminBundle\Repository\ContentBlockImageRepositoryUa")
 */
class ContentBlockImageUa
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
     * @ORM\Column(name="title", type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="image", type="string", length=255)
     */
    private $image = '';

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", nullable=true)
     */
    private $description;

    /**
     * @var ContentBlock
     * 
     * @ORM\ManyToOne(targetEntity="ContentBlockUa", inversedBy="images")
     */
    private $block;

    /**
     * @var int image order position
     * 
     * @ORM\Column(name="position", type="integer", nullable=false)
     */
    private $position = 0;


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
     * Set title
     *
     * @param string $title
     *
     * @return ContentBlockImage
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return ContentBlockImage
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @return ContentBlock
     */
    public function getBlock()
    {
        return $this->block;
    }

    /**
     * @param ContentBlock $block
     *
     * @return self
     */
    public function setBlock(ContentBlockUa $block)
    {
        $this->block = $block;

        return $this;
    }

    /**
     * @return string
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param string $image
     *
     * @return self
     */
    public function setImage($image)
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return int image order position
     */
    public function getPosition()
    {
        return $this->position;
    }

    /**
     * @param int image order position $position
     *
     * @return self
     */
    public function setPosition($position)
    {
        $this->position = $position;

        return $this;
    }
}

