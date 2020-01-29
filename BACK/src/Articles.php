<?php



use Doctrine\ORM\Mapping as ORM;

/**
 * Articles
 *
 * @ORM\Table(name="articles")
 * @ORM\Entity
 */
class Articles
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    public $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100, nullable=false)
     */
    public $name;

    /**
     * @var string
     *
     * @ORM\Column(name="color", type="string", length=50, nullable=false)
     */
    public $color;

    /**
     * @var string
     *
     * @ORM\Column(name="engine", type="string", length=100, nullable=false)
     */
    public $engine;

    /**
     * @var int
     *
     * @ORM\Column(name="hp", type="integer", nullable=false)
     */
    public $hp;

    /**
     * @var int
     *
     * @ORM\Column(name="max_speed", type="integer", nullable=false)
     */
    public $maxSpeed;

    /**
     * @var int
     *
     * @ORM\Column(name="price", type="integer", nullable=false)
     */
    public $price;

    /**
     * @var string
     *
     * @ORM\Column(name="picture", type="string", length=500, nullable=false)
     */
    public $picture;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text", length=65535, nullable=false)
     */
    public $description;


    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name.
     *
     * @param string $name
     *
     * @return Articles
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set color.
     *
     * @param string $color
     *
     * @return Articles
     */
    public function setColor($color)
    {
        $this->color = $color;

        return $this;
    }

    /**
     * Get color.
     *
     * @return string
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set engine.
     *
     * @param string $engine
     *
     * @return Articles
     */
    public function setEngine($engine)
    {
        $this->engine = $engine;

        return $this;
    }

    /**
     * Get engine.
     *
     * @return string
     */
    public function getEngine()
    {
        return $this->engine;
    }

    /**
     * Set hp.
     *
     * @param int $hp
     *
     * @return Articles
     */
    public function setHp($hp)
    {
        $this->hp = $hp;

        return $this;
    }

    /**
     * Get hp.
     *
     * @return int
     */
    public function getHp()
    {
        return $this->hp;
    }

    /**
     * Set maxSpeed.
     *
     * @param int $maxSpeed
     *
     * @return Articles
     */
    public function setMaxSpeed($maxSpeed)
    {
        $this->maxSpeed = $maxSpeed;

        return $this;
    }

    /**
     * Get maxSpeed.
     *
     * @return int
     */
    public function getMaxSpeed()
    {
        return $this->maxSpeed;
    }

    /**
     * Set price.
     *
     * @param int $price
     *
     * @return Articles
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price.
     *
     * @return int
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set picture.
     *
     * @param string $picture
     *
     * @return Articles
     */
    public function setPicture($picture)
    {
        $this->picture = $picture;

        return $this;
    }

    /**
     * Get picture.
     *
     * @return string
     */
    public function getPicture()
    {
        return $this->picture;
    }

    /**
     * Set description.
     *
     * @param string $description
     *
     * @return Articles
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }
}
