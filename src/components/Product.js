import React  from 'react'
import whatsappIcon from '../images/whatsapp.png'
import copyIcon from '../images/copy.png';
import image from "../images/amazon-prod1.jpg";
import heartIcon from "../images/heart.png";


export default function Product (props) {

    let {title, description, owner} = props.allProd;
    return (
      <div>
        <div className="prodsElement">
          <div className="prodsImg">
              <img src={image} alt="Img" />
          </div>
          <div className="prodsContent">
            <div className="prodsTitle">
                {title}
            </div>
            <div className="prodsDesc">
                {description}.. <button className='readMoreBtn'>read more</button> 
            </div>
          </div>
          <div className="metadata">
            <div className="prodsInfo">
            <span className="prodsowner"><button className='Btn' style={{width:'100%', height:'50%'}}>Contact Owner {owner}</button> </span>
            </div>
            <div style={{display: 'inline'}}></div>
            <div className="shareprods">
                <a target="_blank" href={`https://web.whatsapp.com/send?text=${'#'}`}><img src={whatsappIcon} className='shareIcons whatsapIcon' alt="Whatsapp" /></a>
                <a target="_blank" href={`https://twitter.com/intent/tweet?text=${'#'}`}><img src={copyIcon} className='shareIcons' alt="Copy" /></a>
                <a href='#'><img style={{width:"90%"}} src={heartIcon} className="shareIcons LikeIcon" alt="Like" /></a>
            </div>
          </div>
        </div>
      </div>
    );
}

