import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { PORT } from '@/config';
import Player from '@/models/Player'; // Import the Player model
import AvailabilityData from '@/models/models';

export const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/api/availability/:teamName', async (req, res) => {
  const teamName = req.params.teamName;
  try {
    const availabilityData = await AvailabilityData.findAll({
      where: { teamName },
    });

    res.status(200).json(availabilityData);
  } catch (error) {
    console.error('Error fetching availability data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/availability/update-availability', async (req, res) => {
  try {
    const { playerName, matchDay, availability } = req.body;

    const [updatedRowsCount] = await AvailabilityData.update(
      { availability },
      {
        where: { playerName, matchDay },
      }
    );

    if (updatedRowsCount === 1) {
      return res.status(200).json({ message: 'Availability updated successfully' });
    }

    return res.status(404).json({ error: 'Player or match day not found' });
  } catch (error) {
    console.error('Error updating availability:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/api/players', async (req, res) => {
  try {
    // Fetch a list of players from your database or data source
    const players = await Player.findAll(); // Adjust this based on your data model

    res.status(200).json(players);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/players', async (req, res) => {
  try {
    const { name, team } = req.body;

    const player = await Player.create({
      name,
      team,
    });

    if (player) {
      return res.status(200).json({ message: 'New player created successfully' });
    }

    return res.status(500).json({ error: 'Failed to create a new player' });
  } catch (error) {
    console.error('Error creating a new player:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/api/availability/add-member', async (req, res) => {
  try {
    const { playerName, matchDay, availability, teamName } = req.body;

    // Assuming you have an 'AvailabilityData' model for availability data
    const newMember = await AvailabilityData.create({
      playerName,
      matchDay,
      availability,
      teamName,
    });

    if (newMember) {
      return res.status(200).json({ message: 'New member added successfully' });
    }

    return res.status(500).json({ error: 'Failed to add a new member' });
  } catch (error) {
    console.error('Error adding a new member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/players', async (req, res) => {
  try {
    const { playerName, team } = req.body;

    // Delete the player from the 'Player' table
    const deletedPlayer = await Player.destroy({
      where: { name: playerName, team },
    });

    if (deletedPlayer) {
      return res.status(200).json({ message: 'Player deleted successfully' });
    }

    return res.status(404).json({ error: 'Player not found' });
  } catch (error) {
    console.error('Error deleting player:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
app.delete('/api/availability/delete-member', async (req, res) => {
  try {
    const { playerName, matchDay, teamName } = req.body;

    // Delete the member from the 'AvailabilityData' table
    const deletedMember = await AvailabilityData.destroy({
      where: { playerName, matchDay, teamName },
    });

    if (deletedMember) {
      return res.status(200).json({ message: 'Member deleted successfully' });
    }

    return res.status(404).json({ error: 'Member not found' });
  } catch (error) {
    console.error('Error deleting member:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
if (process.env.NODE_ENV === 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} else {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}
