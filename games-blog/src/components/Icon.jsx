import PropTypes from 'prop-types';

Icon.propTypes = {
    imgSrc: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};

function Icon({ imgSrc, url }) {
    return (
        <figure>
            <a href={url} target="_blank" rel="noopener noreferrer" className="iconLink">
                <img 
                    src={imgSrc} 
                    alt="Icon" 
                    className="clickableIcon"
                />
            </a>
        </figure>
    );
}

export default Icon;
