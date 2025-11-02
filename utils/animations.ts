export const getAnimationForItem = (itemId: string): string => {
    switch (itemId) {
        // Shimmer for powerful/rare items
        case 'stone':
        case 'elderwand':
        case 'timeturner':
            return 'animate-shimmer';
        
        // Fly-across for fast-moving items
        case 'snitch':
        case 'nimbus':
            return 'animate-fly-across';

        // Unfold for items that reveal things
        case 'map':
        case 'howler':
        case 'ticket':
            return 'animate-unfold';
        
        // Glow/Pulse for items of significance
        case 'sword':
        case 'remembrall':
        case 'cloak':
            return 'animate-glow-pulse';

        // Swirl-in for magical books/clothing
        case 'potionbook':
        case 'scarf':
            return 'animate-swirl-in';
        
        // Zoom/fade for consumable treats
        case 'beans':
        case 'frog':
        default:
            return 'animate-zoom-and-fade';
    }
};
