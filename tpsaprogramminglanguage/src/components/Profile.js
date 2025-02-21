import React, { useState } from 'react';

function Profile() {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        address: '123 Burger Street',
        favoriteOrders: [
            { id: 1, name: 'Classic Burger', date: '2024-03-15' },
            { id: 2, name: 'Cheese Burger', date: '2024-03-10' }
        ]
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState(profile);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedProfile(profile);
    };

    const handleSave = () => {
        setProfile(editedProfile);
        setIsEditing(false);
    };

    return (
        <section className="profile-section">
            <h2><i className="fas fa-user-circle"></i> Profile Information</h2>
            {isEditing ? (
                <div className="profile-edit">
                    <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
                        placeholder="Name"
                    />
                    <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
                        placeholder="Email"
                    />
                    <input
                        type="tel"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
                        placeholder="Phone"
                    />
                    <input
                        type="text"
                        value={editedProfile.address}
                        onChange={(e) => setEditedProfile({...editedProfile, address: e.target.value})}
                        placeholder="Address"
                    />
                    <button onClick={handleSave}><i className="fas fa-save"></i> Save Changes</button>
                </div>
            ) : (
                <div className="profile-info">
                    <p><i className="fas fa-user"></i> <strong>Name:</strong> {profile.name}</p>
                    <p><i className="fas fa-envelope"></i> <strong>Email:</strong> {profile.email}</p>
                    <p><i className="fas fa-phone"></i> <strong>Phone:</strong> {profile.phone}</p>
                    <p><i className="fas fa-map-marker-alt"></i> <strong>Address:</strong> {profile.address}</p>
                    <button onClick={handleEdit}><i className="fas fa-edit"></i> Edit Profile</button>
                </div>
            )}

            <div className="favorite-orders">
                <h3><i className="fas fa-heart"></i> Favorite Orders</h3>
                <div className="orders-list">
                    {profile.favoriteOrders.map(order => (
                        <div key={order.id} className="order-item">
                            <p><i className="fas fa-hamburger"></i> {order.name}</p>
                            <small><i className="fas fa-calendar-alt"></i> Ordered on: {order.date}</small>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Profile; 