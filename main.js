// Interpolate between two RGB colors
function interpolateRGB(color1, color2, factor) {
    const rgb1 = color1.match(/\d+/g).map(Number);
    const rgb2 = color2.match(/\d+/g).map(Number);

    const r = Math.round(rgb1[0] + factor * (rgb2[0] - rgb1[0]));
    const g = Math.round(rgb1[1] + factor * (rgb2[1] - rgb1[1]));
    const b = Math.round(rgb1[2] + factor * (rgb2[2] - rgb1[2]));

    return `rgb(${r}, ${g}, ${b})`;
}

function animateBackground(targetColors, duration = 1000) {
    const originalColors = {
        start: getComputedStyle(document.body).getPropertyValue('--ColorStart').trim(),
        middle1: getComputedStyle(document.body).getPropertyValue('--ColorMiddle1').trim(),
        middle2: getComputedStyle(document.body).getPropertyValue('--ColorMiddle2').trim(),
        middle3: getComputedStyle(document.body).getPropertyValue('--ColorMiddle3').trim(),
        middle4: getComputedStyle(document.body).getPropertyValue('--ColorMiddle4').trim(),
        end: getComputedStyle(document.body).getPropertyValue('--ColorEnd').trim(),
    };

    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const factor = Math.min(progress / duration, 1); // Ensure factor is not more than 1

        // Interpolate colors for each part of the gradient
        const newStartColor = interpolateRGB(originalColors.start, targetColors[0], factor);
        const newMiddle1 = interpolateRGB(originalColors.middle1, targetColors[1], factor);
        const newMiddle2 = interpolateRGB(originalColors.middle2, targetColors[2], factor);
        const newMiddle3 = interpolateRGB(originalColors.middle3, targetColors[3], factor);
        const newMiddle4 = interpolateRGB(originalColors.middle4, targetColors[4], factor);
        const newEndColor = interpolateRGB(originalColors.end, targetColors[5], factor);

        // Set the new background colors
        document.body.style.setProperty('--ColorStart', newStartColor); 
        document.body.style.setProperty('--ColorMiddle1', newMiddle1); 
        document.body.style.setProperty('--ColorMiddle2', newMiddle2); 
        document.body.style.setProperty('--ColorMiddle3', newMiddle3); 
        document.body.style.setProperty('--ColorMiddle4', newMiddle4);
        document.body.style.setProperty('--ColorEnd', newEndColor); 

        if (factor < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

function animateFontColor(targetFontColors, duration = 1000) {
    const originalFontColor = getComputedStyle(document.body).getPropertyValue('color').trim(); // Get original font color
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const factor = Math.min(progress / duration, 1); // Ensure factor is not more than 1

        // Interpolate font color
        const newFontColor = interpolateRGB(originalFontColor, targetFontColors, factor);
        
        // Set the new font color for body and links
        document.body.style.color = newFontColor;
        document.querySelectorAll('a').forEach(link => {
            link.style.color = newFontColor;
        });

        if (factor < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// RGB equivalent colors for hover
document.querySelectorAll('.MiniContainer').forEach(function(image) {
    image.addEventListener('mouseover', function() {
        animateBackground([
            'rgb(5, 5, 5)',
            'rgb(11, 11, 11)',
            'rgb(15, 15, 15)',
            'rgb(21, 21, 21)',
            'rgb(26, 26, 26)',
            'rgb(31, 31, 31)'
        ]);

        // Animate font color on hover
        animateFontColor('rgb(204, 185, 155)', 1000); // Example target font color
    });

    image.addEventListener('mouseout', function() {
        animateBackground([
            'rgb(20, 20, 20)',   // Original ColorStart on mouse out
            'rgb(26, 26, 26)',   // Original ColorMiddle1 on mouse out
            'rgb(30, 30, 30)',   // Original ColorMiddle2 on mouse out
            'rgb(36, 36, 36)',   // Original ColorMiddle3 on mouse out
            'rgb(41, 41, 41)',   // Original ColorMiddle4 on hover
            'rgb(46, 46, 46)'    // Original ColorEnd on hover
        ]);

        // Reset font color on mouse out
        animateFontColor('rgb(236, 224, 224)', 1000); // Reset to original font color
    });
});
