// Test script for premium evidence content
document.addEventListener('DOMContentLoaded', function() {
    console.log('Testing premium evidence content...');
    
    // Mock player data with premium tier
    const mockPlayerData = {
        email: 'test@example.com',
        premium_tier: 'architects-confidential',
        current_stage: 2,
        story_path: 'analytical'
    };
    
    // Load premium evidence data
    fetch('./premium-evidence.json')
        .then(response => response.json())
        .then(data => {
            console.log('Premium evidence data loaded:', data);
            
            // Filter evidence based on player's premium tier
            const tierValues = {
                'investigator-toolkit': 1,
                'insider-access': 2,
                'architects-confidential': 3
            };
            
            const playerTierValue = tierValues[mockPlayerData.premium_tier] || 0;
            
            // Filter evidence items based on player's tier
            const availableEvidence = data.premium_evidence.filter(item => {
                const itemTierValue = tierValues[item.premium_tier] || 0;
                return itemTierValue <= playerTierValue;
            });
            
            console.log('Available premium evidence for player tier:', availableEvidence);
            
            // Test rendering evidence items
            const testContainer = document.createElement('div');
            testContainer.id = 'test-container';
            testContainer.style.padding = '20px';
            testContainer.style.background = '#f0f0f0';
            testContainer.style.margin = '20px';
            testContainer.style.border = '1px solid #ccc';
            testContainer.innerHTML = '<h2>Premium Evidence Test</h2>';
            
            document.body.appendChild(testContainer);
            
            // Render evidence cards
            availableEvidence.forEach(item => {
                const card = document.createElement('div');
                card.classList.add('evidence-card', 'premium-evidence-card');
                card.style.margin = '10px 0';
                card.style.padding = '15px';
                card.style.background = '#fff';
                card.style.border = '1px solid #ffc107';
                
                card.innerHTML = `
                    <h3 style="color: #333;">${item.title}</h3>
                    <div style="display: flex; justify-content: space-between; margin: 10px 0;">
                        <span>${item.date}</span>
                        <span>${item.type}</span>
                    </div>
                    <div style="margin: 10px 0;">${item.content.substring(0, 100)}...</div>
                    <div style="margin-top: 10px;">
                        <span style="background: #ffc107; color: #333; padding: 3px 8px; font-size: 12px; border-radius: 3px;">${item.premium_tier}</span>
                    </div>
                `;
                
                testContainer.appendChild(card);
            });
            
            console.log('Test rendering complete');
        })
        .catch(error => {
            console.error('Error loading premium evidence:', error);
        });
});
